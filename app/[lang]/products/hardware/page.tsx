import WithDictionary from '../../components/WithDictionary';
import HardwareClient from './HardwareClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <HardwareClient dict={dict} />}
    </WithDictionary>
  );
}