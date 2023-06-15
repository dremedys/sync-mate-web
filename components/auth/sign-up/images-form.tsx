// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { authService } from '@/providers/auth.provider';
import { AuthTokens, UpdateProfileRequestDto } from '@/types/auth';
import { LoadingButton } from '@/ui';
import { Box, styled } from '@mui/material';
// import AWS from 'aws-sdk';
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import { FC, useState } from 'react';
import S3 from 'react-aws-s3-typescript';
// import { FilePond, registerPlugin } from 'react-filepond';
import { useForm } from 'react-hook-form';

// registerPlugin(FilePondPluginImagePreview);

type CityAndDateFormValues = Pick<UpdateProfileRequestDto, 'image_urls' | 'avatar'>;

const bucketName = 'tmp';
const region = 'tmp';
const accessKeyId = 'tmp';
const secretAccessKey = 'tmp';

const config = {
  bucketName,
  // dirName: 'media' /* optional */,
  region,
  accessKeyId,
  secretAccessKey,
  // s3Url: 'https:/your-custom-s3-url.com/' /* optional */,
};

const ReactS3Client = new S3(config);

type Props = {
  onNextStep: () => void;
};

const darik =
  'https://media.licdn.com/dms/image/D4D03AQHDLXiyzu_4Cg/profile-displayphoto-shrink_400_400/0/1685433769858?e=1692230400&v=beta&t=NmPvHSBHYKNRhKkh9dF4SsrSp0qK1Nx2qqsmToWtfQw';

const bina =
  'https://media.licdn.com/dms/image/C4E03AQFNrdj3Ys67Sw/profile-displayphoto-shrink_400_400/0/1618488532790?e=1692230400&v=beta&t=7qNcCnSMtB8XOh3ZR8qYqp0Yh2947zku2AZaqlx8B0k';
export const ImagesForm: FC<Props> = ({ onNextStep }) => {
  const [loading, setLoading] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<CityAndDateFormValues>();
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  const onSubmit = handleSubmit(async values => {
    setLoading(true);

    try {
      // console.log(files[0].name);
      // const params = {
      //   ACL: 'public-read',
      //   Body: selectedFile,
      //   Bucket: S3_BUCKET,
      //   Key: 'dari',
      // };
      // // console.log(files);
      // myBucket.putObject(params).send(err => {
      //   if (err) console.log(err);
      // });
      // ReactS3Client.uploadFile(selectedFile, 'darik')
      //   .then((data: any) => console.log(data))
      //   .catch((err: any) => console.error(err));
      const data = await authService.updateProfile({
        ...values,
        avatar:
          // 'https://media.licdn.com/dms/image/C4E03AQFNrdj3Ys67Sw/profile-displayphoto-shrink_400_400/0/1618488532790?e=1691020800&v=beta&t=W5iig33fUCmKy4amF9_5M9cfDBMfRVjiVJeIeOg2Zdw',
          'https://img.freepik.com/premium-vector/person-avatar-design_24877-38137.jpg?w=2000',
      });
      authService.setLoggedInValue({ profile: data, tokens: authService.getTokens() as AuthTokens });
      onNextStep();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  });

  return (
    <Root>
      {/*<Typography  variant="button">Images</Typography>*/}
      {/*<input*/}
      {/*  type="file"*/}
      {/*  onChange={e => {*/}
      {/*    if (e?.target?.files?.[0]) setSelectedFile(e?.target?.files?.[0]);*/}
      {/*  }}*/}
      {/*/>*/}
      {/*  <FilePond*/}
      {/*  files={files}*/}
      {/*  allowReorder={true}*/}
      {/*  allowMultiple={true}*/}
      {/*  maxFiles={5}*/}
      {/*  storeAsFile={true}*/}
      {/*  server={null}*/}
      {/*  onupdatefiles={res => {*/}
      {/*    setFiles(res.map(a => a.file).map(item => ({ ...item, webkitRelativePath: '' })));*/}
      {/*  }}*/}
      {/*  labelIdle='Drag & Drop your images or <span class="filepond--label-action">Browse</span>'*/}
      {/*/>*/}
      <Box mb="20px">
        <input type="file" />
      </Box>
      <LoadingButton onClick={onSubmit} fullWidth loading={loading} variant="contained">
        Complete registration
      </LoadingButton>
    </Root>
  );
};

const Root = styled('form')(() => ({}));
