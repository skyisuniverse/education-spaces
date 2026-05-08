import WithDictionary from '../../components/WithDictionary';
import SpaceBasedWebDevelopmentPlatformClient from './SpaceBasedWebDevelopmentPlatformClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpaceBasedWebDevelopmentPlatformClient dict={dict} />}
    </WithDictionary>
  );
}