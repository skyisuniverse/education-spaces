import WithDictionary from '../../components/WithDictionary';
import AutomationClient from './AutomationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <AutomationClient dict={dict} />}
    </WithDictionary>
  );
}