import Link from "next/link";
import { toast } from "react-toastify";
import { siteConfig } from "../../shared/config";
import {
  EditorDescription,
  EditorGrid,
  EditorInput,
  EditorRow,
  EditorRowLabel,
  EditorRowText,
  EditorTextArea,
  EditorTitle,
  GenerateButton,
} from "../Common/Settings/styles";

export const CollectionVerification = ({ collection, hostedCollection }) => {
  const copySourceCode = async () => {
    await navigator.clipboard.writeText(hostedCollection.src_code);
    toast.success("Copied source code to clipboard");
  };

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Source Code</EditorTitle>
        <EditorDescription>
          Verify and publish your contract source code
        </EditorDescription>
      </EditorRowText>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Compiler Type</EditorRowLabel>
        </EditorRowText>
        <EditorInput type="text" value="Solidity (Single file)" disabled />
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Compiler Version</EditorRowLabel>
        </EditorRowText>
        <EditorInput type="text" value="v0.8.7" disabled />
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Open Source License Type</EditorRowLabel>
        </EditorRowText>
        <EditorInput type="text" value="No License (None)" disabled />
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Solidity Contract Code</EditorRowLabel>
        </EditorRowText>
        <EditorTextArea
          className="src"
          onClick={() => copySourceCode()}
          value={hostedCollection.src_code}
          readonly
        />
      </EditorRow>

      <EditorRow>
        <a
          href={`${siteConfig.L2_BLOCK_EXPLORER_URL}/address/${collection.address}#code`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <GenerateButton className="">Verify Source Code</GenerateButton>
        </a>
      </EditorRow>
    </EditorGrid>
  );
};
