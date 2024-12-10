import logo from "../../assets/Ignite-simbol.svg"
import { NewTransactionModal } from "../NewTransactionModal"

import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles"
import * as Dialog from "@radix-ui/react-dialog"

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logo} alt="" />
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
