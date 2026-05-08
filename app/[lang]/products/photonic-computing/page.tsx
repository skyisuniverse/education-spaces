import WithDictionary from '../../components/WithDictionary';
import PhotonicComputingClient from './PhotonicComputingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <PhotonicComputingClient dict={dict} />}
    </WithDictionary>
  );
}