import Container from 'app/components/Container'
import React, { FC } from 'react'

import DefaultLayout from './Default'

export interface Layout {
  id: string
}

export const SwapLayoutCard: FC = ({ children }) => {
  return (
    <div className="flex flex-col gap-3 p-2 md:p-4 pt-4 rounded-[30px] bg-dark-transparent border border-dark-300">
      {children}
    </div>
  )
}

export const Layout: FC<Layout> = ({ children, id }) => {
  return (
    <DefaultLayout>
      <Container id={id} className="py-4 md:py-12 lg:pb-[120px] px-2" maxWidth="md">
        {children}
      </Container>
    </DefaultLayout>
  )
}

type SwapLayout = (id: string) => FC
export const SwapLayout: SwapLayout = (id: string) => {
  return (props) => <Layout id={id} {...props} />
}
