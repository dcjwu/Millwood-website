import React from "react"

import Aos from "aos"
import dynamic from "next/dynamic"
import Script from "next/script"

import { Footer } from "@components/Footer/Footer"
import { Header } from "@components/Header/Header"
import { Nav } from "@components/Nav/Nav"
import { Products } from "@components/Products/Products"
import { Section } from "@lib/Section/Section"
import { colorBrandV3 } from "@utils/styles"

import type { NextPage } from "next"

const Topbar = dynamic(() => import("@components/Topbar/Topbar").then(module => module.Topbar))
const About = dynamic(() => import("@components/About/About").then(module => module.About))
const Form = dynamic(() => import("@components/Form/Form").then(module => module.Form))

const Home: NextPage = () => {

   React.useEffect(() => {
      Aos.init({
         easing: "ease-in-out",
         once: true,
         offset: 120,
         delay: 100,
         mirror: true
      })
   }, [])

   return (
      <>

         <Script src="https://www.googletagmanager.com/gtag/js?id=G-3051E82C5W"
                 strategy="lazyOnload"/>

         <Script id="script" strategy="lazyOnload">
            {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                     gtag('config', 'G-3051E82C5W');
                `}
         </Script>

         <Topbar/>

         <Nav/>

         <Header/>

         <Section component="section" header="Products" id="Products">
            <Products/>
         </Section>

         <Section component="section" header="About Us" id="About"
                  style={{ background: colorBrandV3 }}>
            <About/>
         </Section>

         <Section component="section" header="Contact Us" id="ContactUs">
            <Form/>
         </Section>
         
         <Footer/>
      </>
   )
}

export default Home
