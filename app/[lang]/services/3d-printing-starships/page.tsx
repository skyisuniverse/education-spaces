import WithDictionary from '../../components/WithDictionary';
import ThreeDPrintingStarshipsClient from './ThreeDPrintingStarshipsClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ThreeDPrintingStarshipsClient dict={dict} />}
    </WithDictionary>
  );
}