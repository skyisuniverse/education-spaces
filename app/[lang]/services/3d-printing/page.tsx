import WithDictionary from '../../components/WithDictionary';
import ThreeDPrintingClient from './ThreeDPrintingClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ThreeDPrintingClient dict={dict} />}
    </WithDictionary>
  );
}