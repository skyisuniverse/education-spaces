import WithDictionary from '../../components/WithDictionary';
import SpaceLaunchingServicesClient from './SpaceLaunchingServicesClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpaceLaunchingServicesClient dict={dict} />}
    </WithDictionary>
  );
}