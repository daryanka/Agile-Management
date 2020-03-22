import React, {FC, FormEvent} from "react";
import _ from "lodash";
import propTypes from "prop-types";

interface Props {
  className?: string;
  onSubmit: () => void;
  noValidate?: boolean,
  id?: string
}

const Form:FC<Props> = props => {
  const [data, setData] = React.useState<any>({});
  const changedValue = (val: string, name: string) => {
    setData({ ...data, [name]: val })
    setErrors(prev => ({...prev, [name]: null}))
  };
  const [errors, setErrors] = React.useState({});

  let fields: any[] = [];

  const nameAndValidationToField = (children: any) => {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child?.props?.isInput) {
          fields.push({
            name: child.props.name,
            validation: child.props.validation
          })
        } else if (child?.props?.children) {
          nameAndValidationToField(child.props.children)
        } else if (Array.isArray(child)) {
          nameAndValidationToField(child)
        }
      })
    } else {
      //Check for children and props
      if (children?.props?.isInput) {
        fields.push({
          name: children.props.name,
          validation: children.props.validation
        })
      }
      if (children?.props?.children) {
        nameAndValidationToField(children.props.children)
      }
    }
  }


  nameAndValidationToField(props.children)

  React.useEffect(() => {}, [errors]);

  const validateEmail = (email: string) => {
    //If valid email return true, else false
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  /* 
  Validation Options
  required
  min
  max
  identical (e.g. identical:confirm_password)
  email
  type  (e.g. min:5)

  on submit
  loop through fields in fields array
  in loop look at each fields validation
  use parser and then check each type of validation if not valid then set error message (using state) for that field

  */

  const tempErr: any = {};

  const validationParser = (inputVal: string, validationStr: string, fieldName: string) => {
    //Parse validationStr
    if (!validationStr) {
      return true;
    }
    const validationArr = validationStr.split("|");

    if (validationArr.includes("required") && !inputVal) {
      tempErr[fieldName] = "This field is required!"
      return;
    }

    if (validationArr.includes("email") && !validateEmail(inputVal)) {
      return (tempErr[fieldName] = "This field must be a valid email address!");
    }

    //Parse more complex validations such as min:15
    validationArr.forEach(el => {
      const pairArr = el.split(":");
      switch (pairArr[0]) {
        case "min":
          if (inputVal.length <  parseInt(pairArr[1])) {
            return (tempErr[fieldName] = `This field must be at least ${pairArr[1]} characters long!`);
          }
          break;
        case "max":
          if (inputVal.length > parseInt(pairArr[1])) {
            return (tempErr[fieldName] = `This field must be below ${pairArr[1]} characters long!`);
          }
          break;
        case "identical":
          //Check that it is identical to other field
          const otherField = pairArr[1];
          const otherFieldName = pairArr[2];
          let exists = false;
          let index = -1;
          for (let i = 0; i < fields.length; i++) {
            if (fields[i].name == otherField) {
              exists = true;
              index = i;
            }
          }
          if (!exists) {
            return (tempErr[fieldName]) = `This field must be identical to ${otherFieldName}`
          }
          if (inputVal != data[fields[index].name]) {
            return (tempErr[fieldName]) = `This field must be identical to ${otherFieldName}`
          }
          break;
        default:
          break;
      }
    });
  };

  const childrenWithProps = (children: JSX.Element | React.ReactNode | any) => {
    return React.Children.map(children, child => {
      let childProps: any = {};
      // @ts-ignore
      if (React.isValidElement(child) && child?.props?.isInput) {
        childProps = { changedValue, errors };
      }
      if (child?.props) {
        // String has no Prop
        childProps.children = childrenWithProps(child.props.children);
        return React.cloneElement(child, childProps);
      }
      return child;
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
      id={props.id ? props.id : ""}
      className={props.className}
    >
      {childrenWithProps(props.children)}
    </form>
  );
};

Form.defaultProps = {
  noValidate: true
};

Form.propTypes = {
  noValidate: propTypes.bool,
  className: propTypes.string,
  onSubmit: propTypes.func.isRequired,
  id: propTypes.string
}

export default Form;
