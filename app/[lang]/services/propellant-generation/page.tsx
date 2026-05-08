import WithDictionary from '../../components/WithDictionary';
import PropellantGenerationClient from './PropellantGenerationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <PropellantGenerationClient dict={dict} />}
    </WithDictionary>
  );
}