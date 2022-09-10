import * as React from "react";
import {useEffect, useRef } from "react"

interface Props{
  children:React.ReactNode,
  heightInPx:String,
  widthInPx:String,
  classes?:string,
  customStyles?:Object,
  onClick?:Function,
  onMouseOut?:Function,
  onMouseOver?:Function
}

export const Hover = (
  {
    children,
    heightInPx,
    widthInPx,
    onClick,
    onMouseOut,
    onMouseOver,
    classes,
    customStyles={}
  }
  :Props) : JSX.Element => {

  const ref = useRef<HTMLDivElement | null>(null)

  const defaultStyles:Object = {
    cursor:'pointer',
    height:`${heightInPx}`,
    width:`${widthInPx}`
  }
  
  useEffect(() => {
    const el = ref.current
    const height = el?.clientHeight
    const width = el?.clientWidth

    if (el) 
      el.addEventListener('mousemove', handleMove)
    
    function handleMove(e:MouseEvent): void {
      /*
        * Get position of mouse cursor
        * With respect to the element
        * On mouseover
        */
      /* Store the x position */
      const xVal = e.offsetX
      /* Store the y position */
      const yVal = e.offsetY

      /*
        * Calculate rotation valuee along the Y-axis
        * Here the multiplier 20 is to
        * Control the rotation
        * You can change the value and see the results
        */
      if (width != null && height != null) {
        const yRotation = 20 * ((xVal - width / 2) / width)

        /* Calculate the rotation along the X-axis */
        const xRotation = -20 * ((yVal - height / 2) / height)

        /* Generate string for CSS transform property */
        const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
        /* Apply the calculated transformation */
        if (el)
          el.style.transform = string
      }

    }
  }, [])
  
  const handleMouseOver =  (event:React.MouseEvent):Function => {
    const {currentTarget} = event
    if(currentTarget){
      (currentTarget as HTMLElement).style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)';
      (currentTarget as HTMLElement).style.transition = 'all 0s ease-out';
      (currentTarget as HTMLElement).style.boxShadow = '0px 0px 30px rgba(0,0,0, 0.6)';
    }    
    return onMouseOver?.(currentTarget)
  }
  const handleMouseOut = (event:React.MouseEvent):Function=>{
    const {currentTarget} = event
    if(currentTarget){
      (currentTarget as HTMLElement).style.transform = ' perspective(500px) scale(1) rotateX(0) rotateY(0) ';
      (currentTarget as HTMLElement).style.transition = 'all 3s ease-out';
      (currentTarget as HTMLElement).style.boxShadow = '';
    }
    return onMouseOut?.(currentTarget)
  }
  const handleOnClick = (event:React.MouseEvent):Function=>{
    return onClick?.(event)
  }

  let styleList:Object = {...defaultStyles,...customStyles}

  return (
    <div  ref={ref} onClick={handleOnClick} className={classes}  onMouseLeave={handleMouseOut} onMouseOver={handleMouseOver}  style={styleList}>
      {children}
    </div>
  )
}

