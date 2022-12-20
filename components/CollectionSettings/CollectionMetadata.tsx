import { useState } from "react";
import {
  generateCollectionMetadata,
  updateCollectionMetadataUri,
} from "../../api/launchpad";
import { updateMetadataUri } from "../../utils/launchpad/launchpad";
import { switchNetwork } from "../../utils/wallet";
import {
  EditorDescription,
  EditorGrid,
  EditorInput,
  EditorRow,
  EditorRowLabel,
  EditorRowText,
  EditorTitle,
  GenerateButton,
  MetadataButtonGrid,
  Toggle,
  ToggleContainer,
} from "../Common/Settings/styles";

export const CollectionMetadata = ({ collection, hostedCollection }) => {
  const [generatedMetadata, setGeneratedMetadata] = useState(false);
  const [baseUriUseToken, setBaseUriUseToken] = useState(
    hostedCollection.base_uri_token_id
  );
  const [baseUriUseExtension, setBaseUriUseExtension] = useState(
    hostedCollection.base_uri_file_extension
  );

  // `${process.env.NEXT_PUBLIC_API_URL}/launchpad/hosted-metadata/${collection.address}:`
  const [baseUri, setBaseUri] = useState(
    hostedCollection.base_uri ? hostedCollection.base_uri : ""
  );

  const handleGenerateMetadata = async () => {
    await generateCollectionMetadata(collection.address);
    setGeneratedMetadata(true);
  };

  const handleUpdateMetadataUri = async () => {
    await switchNetwork();
    await updateMetadataUri(
      collection.address,
      baseUri,
      baseUriUseToken,
      baseUriUseExtension
    );
    await updateCollectionMetadataUri(
      collection.address,
      baseUri,
      baseUriUseToken,
      baseUriUseExtension
    );
  };

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Collection Metadata</EditorTitle>
        <EditorDescription>
          <div>
            Learn how to upload your collection metadata{" "}
            <a
              href="https://help.qx.app/en/articles/6383890-how-do-i-properly-upload-collection-metadata-to-launchpad"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
          </div>
        </EditorDescription>
      </EditorRowText>

      {/* <EditorRow>
        <div>
          <EditorRowLabel>Generate Metadata</EditorRowLabel>
          <EditorDescription>
            Generate token metadata for your collection. The collection image
            and description will be used for the token metadata. For more
            advanced metadata, please set your own metadata URI.
          </EditorDescription>
        </div>
        {!generatedMetadata && !hostedCollection.metadata_generated ? (
          <GenerateButton
            onClick={() => {
              handleGenerateMetadata();
            }}
          >
            Generate Metadata
          </GenerateButton>
        ) : (
          <GenerateButton className="muted">Generate Metadata</GenerateButton>
        )}
      </EditorRow> */}

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Use Token ID
            <ToggleContainer>
              <Toggle
                className={baseUriUseToken ? "checked" : ""}
                onClick={() => {
                  setBaseUriUseToken(!baseUriUseToken);
                }}
              />
            </ToggleContainer>
          </EditorRowLabel>
          <EditorDescription>
            Enable this setting if your metadata URLs are unqiue for each token
          </EditorDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>
            Use File Extension
            <ToggleContainer>
              <Toggle
                className={baseUriUseExtension ? "checked" : ""}
                onClick={() => {
                  setBaseUriUseExtension(!baseUriUseExtension);
                }}
              />
            </ToggleContainer>
          </EditorRowLabel>
          <EditorDescription>
            Enable this setting if your metadata URLs end in .json
          </EditorDescription>
        </EditorRowText>
      </EditorRow>

      <EditorRow>
        <EditorRowText>
          <EditorRowLabel>Metadata Base URI</EditorRowLabel>
          <EditorDescription>
            Enter the base path for your metadata URL, excluding the token ID or
            file extension
          </EditorDescription>
        </EditorRowText>
        <MetadataButtonGrid>
          <EditorInput
            type="text"
            value={baseUri}
            placeholder="ipfs://"
            onChange={(e) => {
              setBaseUri(e.target.value);
            }}
          />
          {hostedCollection.base_uri == baseUri &&
          hostedCollection.base_uri_token_id == baseUriUseToken &&
          hostedCollection.base_uri_file_extension == baseUriUseExtension ? (
            <GenerateButton className="muted">Set Metadata URI</GenerateButton>
          ) : (
            <GenerateButton
              className="metadata"
              onClick={() => {
                handleUpdateMetadataUri();
              }}
            >
              Set Metadata URI
            </GenerateButton>
          )}
        </MetadataButtonGrid>
      </EditorRow>
    </EditorGrid>
  );
};
