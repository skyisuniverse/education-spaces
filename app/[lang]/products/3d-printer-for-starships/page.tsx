import WithDictionary from '../../components/WithDictionary';
import ThreeDPrinterForStarshipsClient from './ThreeDPrinterForStarshipsClient';

export default function Page(props: any) {
  return (
    <WithDictionary {...props}>
      {(dict) => <ThreeDPrinterForStarshipsClient dict={dict} />}
    </WithDictionary>
  );
}