import React from "react";
import _ from "lodash";

const Form = props => {
  const [data, setData] = React.useState({});
  const changedValue = (val, name) => setData({ ...data, [name]: val });
  const [errors, setErrors] = React.useState({});

  let fields = [];
  props.children.forEach(child => {
    if (_.get(child, "props.handleChange")) {
      fields.push({
        name: child.props.name,
        validation: child.props.validation
      });
    }
  });

  React.useEffect(() => {}, [errors]);

  const validateEmail = email => {
    //If valid email return true, else false
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  /* 
  Validation Options
  required
  min
  max
  type  (e.g. min:5)

  on submit
  loop through fields in fields array
  in loop look at each fields validation
  use parser and then check each type of validation if not valid then set error message (using state) for that field


  */
  const tempErr = {};
  const validationParser = (inputVal, validationStr, fieldName) => {
    //Parse validationStr
    if (!validationStr) {
      return true;
    }
    const validationArr = validationStr.split("|");

    if (validationArr.includes("required") && !inputVal) {
      return (tempErr[fieldName] = "This field is required!");
    }

    if (validationArr.includes("email") && !validateEmail(inputVal)) {
      return (tempErr[fieldName] = "This field must be a valid email address!");
    }

    //Parse more complex validations such as min:15
    validationArr.forEach(el => {
      const pairArr = el.split(":");
      switch (pairArr[0]) {
        case "min":
          if (inputVal.length < pairArr[1]) {
            return (tempErr[fieldName] = `This field must be at least ${
              pairArr[1]
            } characters long!`);
          }
          break;
        case "max":
          if (inputVal.length > pairArr[1]) {
            return (tempErr[fieldName] = `This field must be below ${
              pairArr[1]
            } characters long!`);
          }
          break;
        default:
          break;
      }
    });
  };

  const childrenWithProps = React.Children.map(props.children, child => {
    return child && React.cloneElement(child, { changedValue, errors });
  });

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});
    fields.forEach(field => {
      //Check validations using parser against input values
      validationParser(data[field.name], field.validation, field.name);
    });
    if (!_.isEmpty(tempErr)) {
      return setErrors(tempErr);
    } else {
      props.onSubmit();
    }
  };

  return (
    <form
      noValidate={props.noValidate}
      onSubmit={handleSubmit}
      id={props.id && props.id}
      className={props.className}
    >
      {childrenWithProps}
    </form>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
  noValidate: true
};

export default Form;
