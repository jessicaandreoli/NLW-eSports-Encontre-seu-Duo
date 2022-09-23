import { InputHTMLAttributes } from "react"

//aqui estou extendendo ao InputProps todas as propriedades que tem dentro
//do inoutHTMLAttributes e passo um generic <HTML...> que é um tipo global do 
//type Script p receber html
interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

export function Input(props:InputProps) {
  return(
    <input 
      //Quando faço isso, estou pegando tudo que há dentro do InputProps que tem de 
      //propriedade e passo p esse aqui
      {...props}
      className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'
    />
    
  )
  
}