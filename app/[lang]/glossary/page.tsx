import WithDictionary from '../components/WithDictionary';
import GlossaryPage from './GlossaryPage';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <GlossaryPage dict={dict} />}
    </WithDictionary>
  );
}