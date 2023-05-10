import { MainLayout } from '@/layout/main-layout/main-layout';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Box, IconButton, Typography, styled } from '@mui/material';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const AboutPage = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <MainLayout>
      <Root className="container">
        <Typography variant="h2" sx={{ fontWeight: 600 }} mb="32px">
          About project
        </Typography>
        <Typography variant="h6" color="text.secondary" mb="32px">
          SyncMate is a platform for finding ideal partners for your startup, project or other activities, using
          advanced matching algorithms and recommendations. 💯
          <br />
          Problem: The complexity and cost of finding the ideal partners for a startup, project or other activities
          manually.
          <br />
          Solution: Using advanced matching algorithms and recommendations to provide accurate and personalized
          recommendations based on the interests, visions and needs of users, which helps save time and increases the
          likelihood of successful cooperation.
        </Typography>
        <Document file="/docs/sync-mate.pdf" onLoadSuccess={onDocumentLoadSuccess}>
          <Page
            width={900}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            renderInteractiveForms={true}
            pageNumber={pageNumber}
          />
        </Document>
        <Box
          m="10px 0px"
          width="900px"
          display="flex"
          justifyContent="flex-start"
          p="6px 8px"
          alignItems="center"
          sx={{ background: 'lightgrey', borderRadius: '6px' }}>
          <IconButton disabled={pageNumber <= 1} onClick={() => setPageNumber(pageNumber - 1)}>
            <ArrowBackIos />
          </IconButton>
          <span>
            {pageNumber} / {numPages}
          </span>
          <IconButton disabled={pageNumber >= numPages} onClick={() => setPageNumber(pageNumber + 1)}>
            <ArrowForwardIos />
          </IconButton>
        </Box>{' '}
      </Root>
    </MainLayout>
  );
};

const Root = styled('div')`
  margin: 64px auto;
`;

export default AboutPage;
