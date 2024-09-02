import { LinkNav } from '../atoms/LinkNav';

export const NavLinks = () => {
  return (
    <nav className="flex gap-3">
      <LinkNav href="#">Início</LinkNav>
      <LinkNav href="#">Sobre nós</LinkNav>
      <LinkNav href="#">Produtos</LinkNav>
      <LinkNav href="#">Serviço</LinkNav>
    </nav>
  );
};
