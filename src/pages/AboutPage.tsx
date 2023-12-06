//import React from 'react';
//import { useNavigate, useLocation, Navigate } from 'react-router-dom';

import { withPageData } from '@utils';

import { IGenericComponent, IGenericProps } from '@@types/generic-types';
interface IPageProps extends IGenericProps {}

const AboutPage = (props: IPageProps): IGenericComponent => {
  const { className } = props;

  return (
    <main className={['page__c about', className].css()}>
      <h1 className={`h1`}>ABOUTPAGE 1</h1>
      <h2 className={`h2`}>HEADING 2</h2>
      <h3 className={`h3`}>HEADING 3</h3>
      <h4>HEADING 4</h4>
      <h5>HEADING 5</h5>
      <input defaultValue="input" placeholder="placeholder.." />
      <p>
        Paragraph: Similar to what I mentioned in the mobile web section, there’s a great rule of
        thumb here: your website’s text (viewed at typical monitor distance) should be as readable
        as a well-made book (viewed at typical book-holding distance). This is actually a really
        annoying and dorky exercise to perform, because you have to shut one eye and squint at a
        book you’re holding up like a moron. But find a nice, solitary place, and sanity-check: is
        my font size readable even at a couple feet? Even adjusting for my young and powerful eyes?
        OK, you get the idea.
      </p>
      <button className={`btn btn--standard`}>btn butext</button>
      <button className={`btn btn--outline`}>btn butext</button>

      <div className={`f-grid f-col col-2`}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map(index => (
          <div key={index} className={`flex-item`} style={{ width: 'auto', backgroundColor: 'red' }} />
        ))}
      </div>
    </main>
  );
};

const pageData = { page: 'about', img: '' };
export default withPageData(AboutPage, pageData);
