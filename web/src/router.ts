// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about`
  | `/blog`
  | `/blog/:blogId`
  | `/contact`
  | `/dashboard`
  | `/orderdetail`
  | `/orderhistory`
  | `/settings`
  | `/shop`
  | `/shop/products/:productId`
  | `/shopping-cart`
  | `/shopping-cart/checkout`
  | `/sign-in`
  | `/sign-up`
  | `/wishlist`

export type Params = {
  '/blog/:blogId': { blogId: string }
  '/shop/products/:productId': { productId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
