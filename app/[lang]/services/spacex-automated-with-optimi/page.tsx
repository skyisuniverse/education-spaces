import WithDictionary from '../../components/WithDictionary';
import SpacexAutomatedWithOptimiClient from './SpacexAutomatedWithOptimiClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <SpacexAutomatedWithOptimiClient dict={dict} />}
    </WithDictionary>
  );
}