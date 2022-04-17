import React from 'react';
import {Header} from './';

interface Props {
  children : HTMLElement
}

const Layout = ({children}: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout