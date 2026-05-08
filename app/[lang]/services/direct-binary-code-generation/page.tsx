import WithDictionary from '../../components/WithDictionary';
import DirectBinaryCodeGenerationClient from './DirectBinaryCodeGenerationClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <DirectBinaryCodeGenerationClient dict={dict} />}
    </WithDictionary>
  );
}