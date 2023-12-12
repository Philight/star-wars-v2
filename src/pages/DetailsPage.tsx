import { CardDetail } from '@components/card';
import { withPageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const DetailsPage = (props: IPageProps): IGenericComponent => {
  const { className } = props;

  return (
    <main className={['page__c details', className].css()}>
      <CardDetail />
    </main>
  );
};

const pageData = { page: 'details', img: '' };
export default withPageData(DetailsPage, pageData);
