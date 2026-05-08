import WithDictionary from '../../components/WithDictionary';
import HealingAutismClient from './HealingAutismClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <HealingAutismClient dict={dict} />}
    </WithDictionary>
  );
}