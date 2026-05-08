import WithDictionary from '../../components/WithDictionary';
import TeslaClient from './TeslaClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TeslaClient dict={dict} />}
    </WithDictionary>
  );
}