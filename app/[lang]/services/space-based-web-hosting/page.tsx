import WithDictionary from '../../components/WithDictionary';
import SpaceBasedWebHostingClient from './SpaceBasedWebHostingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpaceBasedWebHostingClient dict={dict} />}
    </WithDictionary>
  );
}