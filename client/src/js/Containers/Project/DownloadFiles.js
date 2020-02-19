import React, {useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import { FaFileDownload, FaTimes } from "react-icons/fa"
import constants from "../../constants";
import {useToasts} from "react-toast-notifications";
import _ from "lodash";
import LoaderBtn from "../../Components/LoaderBtn";


const DownloadFiles = (props) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts()

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);

      if (constants.availableDataTypes.includes(extension)) {
        setFiles(prev => [...prev, file])
      } else {
        //Send Notification
        addToast(`Cannot upload files with extension ${extension}.`, {
          appearance: "error",
          autoDismiss: true,
        })
      }
    })
  }, [])
  console.log("files are", files)

  const removeFile = (i) => {
    if (loading) {
      return false
    }
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles(newFiles);
  }

  const saveFiles = async () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      addToast(`New files uploaded.`, {
        appearance: "success",
        autoDismiss: true,
      })
    }, 10000)
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, disabled: loading})
  return(
    <div className={"files"}>
      <h3>Files</h3>
      <div className={"files-box"}>
        {props.files.map((file, i) => {
          return(
            <button key={`file-download-${i}`} className={"button"}>{file.name} <FaFileDownload/></button>
          )
        })}
        <div className={`drop-zone ${isDragActive ? "active" : ""} ${loading ? "loading" : ""}`} {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drop files here, or click to select files (optional) <span>Allowed file types: {constants.availableDataTypes.map((fileType, i) => {
            if (i === constants.availableDataTypes.length - 1) {
              return `${fileType}`
            }
            return `${fileType}, `
          })}</span></p>

        </div>
        {!_.isEmpty(files) && (
          <div className={"files-list"}>
            {files.map((file, i) => {
              return <p key={`file-${i}`} className={"single-file"}>{file.name} <FaTimes onClick={() => removeFile(i)}/></p>
            })}
            <LoaderBtn loading={loading} disabled={loading} onClick={saveFiles} className={"button"}>Save New Files</LoaderBtn>
          </div>
        )}
      </div>
    </div>
  )
}

export default DownloadFiles