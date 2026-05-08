import WithDictionary from '../../components/WithDictionary';
import WarpDriveClient from './WarpDriveClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <WarpDriveClient dict={dict} />}
    </WithDictionary>
  );
}