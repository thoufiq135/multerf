import { useState } from "react"
import "./index.css"
function App() {
  const[select,setselect]=useState(null)
  const[show,setshow]=useState(false)
  const[file,setfile]=useState(null)
  const [fileUrl, setFileUrl] = useState(null);
  const [fileType, setFileType] = useState("");
  const selectfile=(e)=>{
    setselect(e.target.files[0])
  }
  async function filehandle(e){
    e.preventDefault()
    if(!select){
      alert("Please select a file")
    }else{
      const formdata=new FormData()
      formdata.append("file",select)
      try{
        const response=await fetch("https://multerbf1.vercel.app/upload",{
          method:"POST",
          body:formdata
         
        })
        const r=await response.json()

        if(response.status!==200){
          alert("Server is busy")
          setshow(false)
        }else{
          console.log(r)
          setshow(true)
          setfile(r.file)
        }
      }catch(e){
    console.log(e)
      }
    }
  
  }
async function fetchfile() {
  try{
    console.log("Name=",file.name)
    const response=await fetch("https://multerbf1.vercel.app/upload/view",{
     method:"POST",
     body:JSON.stringify({
     
      Name:file.name
     }),headers:{
      "Content-Type":"application/json"
     }
    })  
    const r= await response.blob()
    const url=URL.createObjectURL(r)
    setFileUrl(url)
    setFileType(r.type)

  }catch(e){
    console.log(e)
  }
}

  return (
    <>

<form onSubmit={filehandle}>
<label htmlFor="file" className="custum-file-upload">
<div className="icon">
<svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
</div>
<div className="text">
   <span>Click on upload to file</span>
   </div>
   <input id="file" type="file" name="file" onChange={selectfile}/>
</label>
<button type="submit">Upload</button>
</form>
{show && file && (
        <div>
          <h1>File Uploaded Successfully</h1>
          <p><strong>Name:</strong> {file.name}</p>
          <p><strong>Original Name:</strong> {file.originalname}</p>
          <p><strong>MIME Type:</strong> {file.mimetype}</p>
          <p><strong>Size:</strong> {file.size} bytes</p>
          <button onClick={fetchfile}>View file</button>
        </div>
      )}
      {fileUrl&&(
        <>
        {fileType.startsWith("image/")&& <img src={fileUrl}/>}
        {fileType==="application/pdf" && <iframe id="frame" style={{height:"100vh",width:"100vw"}} src={fileUrl}></iframe>}
        {!fileType.startsWith("image/") && fileType !== "application/pdf" && (
                        <p>Unsupported file type</p>)}
        </>
      )}

    </>   
  )
}

export default App
