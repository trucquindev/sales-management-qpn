// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `/`
  | `/about`
  | `/admin`
  | `/admin/components/dashboard-widgets`
  | `/admin/components/header`
  | `/admin/components/siderbar`
  | `/admin/products`
  | `/admin/users`
  | `/admin/users/components/delete-confirmation`
  | `/admin/users/components/user-form`
  | `/admin/users/components/user-table`
  | `/blog`
  | `/blog/:blogId`
  | `/contact`
  | `/dashboard`
  | `/forgot-pass`
  | `/orderdetail`
  | `/orderhistory`
  | `/settings`
  | `/shop`
  | `/shop/products/:productId`
  | `/shopping-cart`
  | `/shopping-cart/checkout`
  | `/sign-in`
  | `/sign-up`
  | `/test`
  | `/wishlist`

export type Params = {
  '/blog/:blogId': { blogId: string }
  '/shop/products/:productId': { productId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
