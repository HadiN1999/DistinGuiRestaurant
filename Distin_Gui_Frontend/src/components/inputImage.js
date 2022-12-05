import * as React from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useRef } from 'react';
import { Box, Typography } from '@mui/material';
const ImageInput = ({categoryImage, setCategoryImage}) => {

    const [isDragging, setIsDraging] = React.useState(false)
    const inputFile = useRef(null)


    const handleDrags = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraging(true)
    }

    const handleDragEnter = (e) => {
        handleDrags(e);
    }

    const handleDragOver = (e) => {
        handleDrags(e);
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDraging(false)
    }

    const uploadCSV = (e) => {
        const file = e.target.files[0];

        console.log(file)

        var reader = new FileReader();

        reader.onloadend = async(e) => {

            if (['jpg', 'png', 'svg'].includes(file.name.split('.')[file.name.split('.').length - 1].toLowerCase())) {
                let imageUrl = e.target.result;
                imageUrl = await (await fetch(imageUrl).then(r=>r.blob()))
                imageUrl = URL.createObjectURL(imageUrl)
                setCategoryImage(imageUrl)
            } 
        }
        reader.readAsDataURL(file);
    }

    const handleDrop = (e) => {
        e.stopPropagation();
        e.preventDefault();

        const data = e.dataTransfer;
        const files = data.files;
        console.log("Oops...you dropped this: ", files);

        [].forEach.call(files, handleFiles);

        setIsDraging(false)
    }
    const handleFiles =  (file) => {

        // this could be refactored to not use the file reader

        var reader = new FileReader();

        reader.onloadend = async (e) => {

            if (['jpg', 'png', 'svg'].includes(file.name.split('.')[file.name.split('.').length - 1].toLowerCase())) {
                let imageUrl = e.target.result;
                imageUrl = await (await fetch(imageUrl).then(r=>r.blob()))
                imageUrl = URL.createObjectURL(imageUrl)
                setCategoryImage(imageUrl)
                setCategoryImage(imageUrl)
            } 

        }

        reader.readAsDataURL(file);
    }


  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                {categoryImage === '' && <div className={isDragging ? 'dragDrop dragging greyBorder' : 'dragDrop'}
                                        onDrop={handleDrop}
                                        onClick={() => inputFile.current.click()}
                                        onDragOver={handleDragOver}
                                        onDragEnter={handleDragEnter}
                                        onDragLeave={handleDragLeave} >
                    <div className="inside">
                        <div>
                            <FileUploadIcon sx={{ fontSize: '5vh', color: '#a61d24' }} className="icon" />
                        </div>
                        <Typography variant={'h6'} style={{ color: '#a61d24', fontStyle: 'italic' }} >
                            Drag Category image here or click
                        </Typography>
                    </div>
                    <input id='myInputFileId' type='file' onChange={(e) => uploadCSV(e)} ref={inputFile} style={{ display: 'none' }} />
                </div>}
                {
                    categoryImage !== '' && <Box className='documentUploaded' sx={{
                        width: '40% !important',
                        maxHeight: 300
                    }}>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <DeleteIcon onClick={() => {
                                setCategoryImage('')
                            }} sx={{ cursor: 'pointer', color: '#a61d24', fontSize: '3vh' }} />
                        </Box>
                        <img src={categoryImage} style={{ maxWidth: '90%', maxHeight: '90%', marginLeft: 'auto', marginRight: 'auto' }} />
                    </Box>
                }
            </Box>
  );
}

export default ImageInput