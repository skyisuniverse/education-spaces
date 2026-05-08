import WithDictionary from '../../components/WithDictionary';
import TeslaAutomatedWithOptimiClient from './TeslaAutomatedWithOptimiClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <TeslaAutomatedWithOptimiClient dict={dict} />}
    </WithDictionary>
  );
}