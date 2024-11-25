// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
<<<<<<< HEAD
  | `/dashboard`
  | `/login`
  | `/orderdetail`
  | `/orderhistory`
  | `/register`
  | `/settings`
=======
  | `/`
  | `/about`
  | `/blog`
  | `/blog/:blogId`
  | `/contact`
>>>>>>> ff3ea9077b66c4cb3cbfade532e4c269017a226b
  | `/shop`
  | `/shop/products/:productId`
  | `/shopping-cart`
  | `/shopping-cart/checkout`
  | `/wishlist`

export type Params = {
  '/blog/:blogId': { blogId: string }
  '/shop/products/:productId': { productId: string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
