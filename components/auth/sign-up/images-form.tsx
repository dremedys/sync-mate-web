// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

import { authService } from '@/providers/auth.provider';
import { AuthTokens, UpdateProfileRequestDto } from '@/types/auth';
import { LoadingButton } from '@/ui';
import { styled } from '@mui/material';
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
      const data = await authService.updateProfile(values);
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
      <div>Just press button, images are WIP</div>
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

      <LoadingButton onClick={onSubmit} fullWidth loading={loading} variant="contained">
        Complete registration
      </LoadingButton>
    </Root>
  );
};

const Root = styled('form')(() => ({}));
