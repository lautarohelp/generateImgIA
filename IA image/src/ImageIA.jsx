import { HfInference } from '@huggingface/inference';
import { useState } from 'react';
import './img.css';

export function ImageIA() {
const hf = new HfInference("tokenIA");
const [ imgURL, setImgURL] = useState("");
const [ prompt, setPrompt ] = useState("");

  const promptIMG = (e) => {
    const {value} = e.target;
    setPrompt(value);
    console.log(prompt);
  }

  const createIMG = async () => {
    document.querySelector("img").style.display = 'none';
    document.querySelector("h1").style.display = 'block';
    
    const result = await hf.textToImage({
    inputs: prompt,
    model: 'runwayml/stable-diffusion-v1-5',
    parameters: {
      negative_prompt: 'blurry',
    }
  })
  document.querySelector("h1").style.display = 'none';
  document.querySelector("img").style.display = 'block';
  setImgURL(URL.createObjectURL(result));
}

  return (
    <>
      <input 
      type="text" 
      onChange={promptIMG}
      />
      <button onClick={createIMG}>createIMG</button>
      <img src={imgURL} alt="" />
      <h1 className='loading' >Loading.....</h1>
    </>
  )
}


