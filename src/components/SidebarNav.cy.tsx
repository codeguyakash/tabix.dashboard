import React from 'react'
import { SidebarNav } from './SidebarNav'

describe('<SidebarNav />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SidebarNav />)
  })
})