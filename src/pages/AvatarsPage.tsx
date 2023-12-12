import { useOutletContext } from 'react-router-dom';

import { CardsList } from '@components/card';
import { withPageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const AvatarsPage = (props: IPageProps): IGenericComponent => {
  const { className } = props;
  const { layoutProps } = useOutletContext();
  const { searchValue } = layoutProps;

  return (
    <main className={['page__c avatars f-col', className].css()}>
      <h1 className={[`page__heading`].css()}>Avatars</h1>
      <CardsList searchValue={searchValue} />
    </main>
  );
};

const pageData = { page: 'avatars', img: '' };
export default withPageData(AvatarsPage, pageData);
