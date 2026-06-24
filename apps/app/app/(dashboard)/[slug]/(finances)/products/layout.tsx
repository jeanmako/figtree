import { ReactNode } from "react"
import { ProductsLayout } from "@/modules/prods_and_services/product-layout"

export default function WorkspaceLayout({ children }: { children: ReactNode }) {
  return <ProductsLayout>{children}</ProductsLayout>
}
