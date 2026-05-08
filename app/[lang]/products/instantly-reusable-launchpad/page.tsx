import WithDictionary from '../../components/WithDictionary';
import InstantlyReusableLaunchpadClient from './InstantlyReusableLaunchpadClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <InstantlyReusableLaunchpadClient dict={dict} />}
    </WithDictionary>
  );
}