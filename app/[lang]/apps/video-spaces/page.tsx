import WithDictionary from '../../components/WithDictionary';
import VideoSpacesClient from './VideoSpacesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <VideoSpacesClient dict={dict} />}
    </WithDictionary>
  );
}