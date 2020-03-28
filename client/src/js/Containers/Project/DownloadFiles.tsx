import React, {FC, useCallback, useState} from "react";
import {useDropzone} from "react-dropzone";
import { FaFileDownload, FaTimes } from "react-icons/fa"
import constants from "../../constants";
import {useToasts} from "react-toast-notifications";
import _ from "lodash";
import LoaderBtn from "../../Components/LoaderBtn";
import {FileType} from "./Project";
import ContentLoader from "../../Components/ContentLoader";
import fn from "../../../functions";

interface Props {
  files?: FileType[];
  project_id?: number
}

const DownloadFiles: FC<Props> = (props) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts()
  const [contentLoading, setContentLoading] = useState(false);
  const [apiFiles, setApiFiles] = useState<FileType[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(typeof acceptedFiles);

    for (let i = 0; i < acceptedFiles.length; i++) {
      const file = acceptedFiles[i]
      const extension = file.name.slice((Math.max(0, file.name.lastIndexOf(".")) || Infinity) + 1);

      if (file.size / 1000 >= 2000) {
        addToast(`File ${file.name} cannot be larger than 2mb.`, {
          appearance: "error",
          autoDismiss: true,
        })
        continue;
      }

      if (constants.availableDataTypes.includes(extension)) {
        setFiles(prev => [...prev, file])
      } else {
        //Send Notification
        addToast(`Cannot upload files with extension ${extension}.`, {
          appearance: "error",
          autoDismiss: true,
        })
      }
    }
  }, [])

  const fetchData = async () => {
    setContentLoading(true);
    const res = await fn.get(`/projects/individual/${props.project_id}`);

    if (!fn.apiError(res)) {
      setApiFiles(res.data.project.files)
      setContentLoading(false);
    } else {
      setContentLoading(false);
    }
  }

  React.useEffect(() => {
    props.files && setApiFiles(props.files);
  }, [])

  const removeFile = (i: number) => {
    if (loading) {
      return false
    }
    const newFiles = [...files];
    newFiles.splice(i, 1);
    setFiles(newFiles);
  }

  const saveFiles = async () => {
    setLoading(true)

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files[${i}]`, files[i]);
    }

    const res = await fn.post(`/files/upload/${props.project_id}`, formData);

    if (!fn.apiError(res)) {
      setLoading(false)
      fetchData();
      addToast(`New files uploaded.`, {
        appearance: "success",
        autoDismiss: true,
      })

      setFiles([]);
    } else {
      setLoading(false)
      addToast(`Unable to uploaded files.`, {
        appearance: "error",
        autoDismiss: true,
      })
    }
  }

  const downloadFile = async (id: number, fileName: string) => {
    const res = await fn.get(`/files/${id}`, {
      responseType: "blob"
    });

    if (!fn.apiError(res)) {
      console.log(res)
      const blob = new Blob([res.data], {type: res.headers["content-type"]})

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      document.body.append(a)
      a.download = fileName;
      a.href = url;
      a.click();

      window.URL.revokeObjectURL(url);
      document.removeChild(a)
    }

    console.log("res is", res);
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, disabled: loading})
  return(
    <div className={"files"}>
      <h3>Files</h3>
      <div className={"files-box"}>
        <ContentLoader loading={contentLoading} data={apiFiles} message={"No files uploaded."}>
          <>
            {apiFiles.map((file, i) => {
              return(
                <button onClick={() => downloadFile(file.id, file.file_name)} key={`file-download-${i}`} className={"button"}>{file.file_name} <FaFileDownload/></button>
              )
            })}
          </>
        </ContentLoader>
        {!contentLoading && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}

export default DownloadFiles;