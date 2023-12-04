/**
 * Interface for describing all nav items
 *
 * @property title - title of the nav item
 * @property href - href of the nav item
 * @property disabled - whether the nav item is disabled
 * @property external - whether the nav item is external
 */
export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}
