import WithDictionary from '../../components/WithDictionary';
import MassDriverClient from './MassDriverClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <MassDriverClient dict={dict} />}
    </WithDictionary>
  );
}