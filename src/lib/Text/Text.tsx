import React from "react"

import classNames from "classnames/bind"

import s from "./Text.module.scss"

const cx = classNames.bind(s)

type TextType = {
   component: "p" | "span" | "li" | "h3"
   variant: "paragraph" | "paragraph-lg" | "label"
   color: "brand" | "white" | "300" | "400" | "600" | "1000"
   isBold?: boolean
   children: React.ReactNode
   [k: string]: unknown
}

export const Text: React.FC<TextType> = ({
   component,
   variant,
   color,
   isBold,
   children,
   ...props
}): JSX.Element => {

   const classNamesText = cx(s.text, {
      [`c_${color}`]: `c_${[color]}`,
      [variant]: variant,
      bold: isBold
   })

   const Tag = component as React.ElementType

   return (
      <Tag {...props} className={classNamesText}>{children}</Tag>
   )
}