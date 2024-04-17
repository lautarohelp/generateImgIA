import { HfInference } from '@huggingface/inference';
import { useEffect, useState } from 'react';
import './img.css';

export function ImageIA() {
const hf = new HfInference("");
const [ imgURL, setImgURL] = useState("");
const [ prompt, setPrompt ] = useState("");
const [ text, setText ] = useState("");


useEffect(()=>{
  if (text) {
    document.querySelector("h2").style.display = 'block';
  }else {
    document.querySelector("h2").style.display = 'none';
  }
}, [text, imgURL])


  const promptIMG = (e) => {
    const {value} = e.target;
    setPrompt(value);
    console.log(prompt);
  }

  const createIMG = async () => {
    document.querySelector("img").style.display = 'none';
    document.querySelector("h1").style.display = 'block';
    document.querySelector("h2").style.display = 'none';
    
    const result = await hf.textToImage({
    inputs: prompt,
    model: 'runwayml/stable-diffusion-v1-5',
    parameters: {
      negative_prompt: 'blurry',
    }
  })
  const resultTX = await hf.imageToText({
    data: result,
    model: "Salesforce/blip-image-captioning-large"
  })
  document.querySelector("h1").style.display = 'none';
  document.querySelector("img").style.display = 'block';
  document.querySelector("h2").style.display = 'block';
  setImgURL(URL.createObjectURL(result));
  setText(resultTX.generated_text);
}

const traslate = async() => {

  const result = await hf.translation({
    model: 'Helsinki-NLP/opus-mt-en-es',
    inputs: text,
  })
  setText(result.translation_text);
  console.log(result);
}


  return (
    <>
      <input 
      type="text" 
      onChange={promptIMG}
      />
      <button onClick={createIMG}>createIMG</button>
      <img src={imgURL} alt="" />
      <h2>{text} <button onClick={traslate}>Traducir</button></h2>
      <h1 className='loading' >Loading.....</h1>
    </>
  )
}


