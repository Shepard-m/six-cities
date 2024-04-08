import { ReactNode } from 'react';
import Header from '../header/header';
import clsx from 'clsx';
import Footer from '../footer/footer';

type TContainerProps = {
  children: ReactNode;
  pageClass?: string;
  mainClass: string;
  navigation?: boolean;
  isFooter?: boolean;
}

export default function Container({ children, pageClass, isFooter, mainClass, navigation = true }: TContainerProps) {
  return (
    <div className={clsx('page', pageClass)}>
      <Header navigation={navigation} />
      <main className={clsx('page__main', mainClass)}>
        {children}
      </main>
      {isFooter && <Footer />}
    </div>

  );
}
