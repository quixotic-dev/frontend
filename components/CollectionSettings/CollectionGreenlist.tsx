import { CSSProperties, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { lightenDarkenColor, useCSVReader } from "react-papaparse";
import { toast } from "react-toastify";
import { fetchMoreByURL } from "../../api/general";
import { fetchGreenlist, updateCollectionGreenlist } from "../../api/launchpad";
import {
  EditorDescription,
  EditorGrid,
  EditorRowText,
  EditorTitle,
  GreenlistGrid,
  GreenlistUploadContainer,
  LoadingRing,
} from "../Common/Settings/styles";

const GREY = "#CCC";
const DEFAULT_REMOVE_HOVER_COLOR = "#A01919";
const REMOVE_HOVER_COLOR_LIGHT = lightenDarkenColor(
  DEFAULT_REMOVE_HOVER_COLOR,
  40
);
const GREY_DIM = "#686868";

const styles = {
  zone: {
    alignItems: "center",
    border: `1px dashed ${GREY}`,
    borderRadius: 6,
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "center",
    padding: 20,
  } as CSSProperties,
  file: {
    background: "#EEE",
    borderRadius: 8,
    display: "flex",
    height: 120,
    width: 120,
    position: "relative",
    zIndex: 10,
    flexDirection: "column",
    justifyContent: "center",
  } as CSSProperties,
  info: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  name: {
    borderRadius: 3,
    fontSize: 12,
    marginBottom: "0.5em",
  } as CSSProperties,
  progressBar: {
    bottom: 14,
    position: "absolute",
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  } as CSSProperties,
  zoneHover: {
    borderColor: GREY_DIM,
  } as CSSProperties,
  default: {
    borderColor: GREY,
  } as CSSProperties,
  remove: {
    height: 23,
    position: "absolute",
    right: 6,
    top: 6,
    width: 23,
  } as CSSProperties,
};

export const CollectionGreenlist = ({ collection, hostedCollection }) => {
  const { CSVReader } = useCSVReader();
  const [zoneHover, setZoneHover] = useState(false);
  const [removeHoverColor, setRemoveHoverColor] = useState(
    DEFAULT_REMOVE_HOVER_COLOR
  );
  const [greenlist, setGreenlist] = useState(null);
  const [moreGreenlist, setMoreGreenlist] = useState(false);
  const [greenlistResults, setGreenlistResults] = useState([]);

  async function fetchMoreAddresses() {
    const list = await fetchMoreByURL(
      greenlist.next.replace("update-greenlist", "greenlist")
    );

    if (!list.next) {
      setMoreGreenlist(false);
    }

    setGreenlist(list);
    setGreenlistResults(greenlistResults.concat(list.results));
  }
  const [updatingGreenlist, setUpdatingGreenlist] = useState(false);

  const handleUpdateGreenlist = async (addresses) => {
    if (addresses.length > 10001) {
      return toast.error("Can only process up to 10K addresses at a time");
    }

    const formData = new FormData();
    formData.append("addresses", JSON.stringify(addresses));

    setUpdatingGreenlist(true);

    const updatedGreenlist = await updateCollectionGreenlist(
      collection.address,
      formData
    );

    if (updatedGreenlist) {
      setGreenlist(updatedGreenlist);
      setGreenlistResults(updatedGreenlist.results);
      setMoreGreenlist(updatedGreenlist.next ? true : false);
      setUpdatingGreenlist(false);
    }
  };

  useEffect(() => {
    async function fetchGreenlistAddresses() {
      setUpdatingGreenlist(true);
      const addresses = await fetchGreenlist(collection.address);
      if (addresses) {
        setGreenlist(addresses);
        setGreenlistResults(addresses.results);
        setMoreGreenlist(addresses.next ? true : false);
        setUpdatingGreenlist(false);
      }
    }

    if (hostedCollection) {
      fetchGreenlistAddresses();
    }
  }, []);

  return (
    <EditorGrid>
      <EditorRowText>
        <EditorTitle>Collection Allowlist</EditorTitle>
        <EditorDescription>
          Upload a CSV of addresses & sign the message to update the allowlist.
          Uploading additional addresses will add them to the existing
          allowlist.
        </EditorDescription>
      </EditorRowText>

      <GreenlistUploadContainer>
        <CSVReader
          onUploadAccepted={(results: any) => {
            if (results && results.data) {
              handleUpdateGreenlist(results.data);
            }
            setZoneHover(false);
          }}
          onDragOver={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(true);
          }}
          onDragLeave={(event: DragEvent) => {
            event.preventDefault();
            setZoneHover(false);
          }}
        >
          {({
            getRootProps,
            acceptedFile,
            ProgressBar,
            getRemoveFileProps,
            Remove,
          }: any) => (
            <>
              <div
                {...getRootProps()}
                style={Object.assign(
                  {},
                  styles.zone,
                  zoneHover && styles.zoneHover
                )}
              >
                {acceptedFile ? (
                  <>
                    <div style={styles.file}>
                      <div style={styles.info}>
                        <span style={styles.name}>{acceptedFile.name}</span>
                      </div>
                      <div style={styles.progressBar}>
                        <ProgressBar />
                      </div>
                      <div
                        {...getRemoveFileProps()}
                        style={styles.remove}
                        onMouseOver={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(REMOVE_HOVER_COLOR_LIGHT);
                        }}
                        onMouseOut={(event: Event) => {
                          event.preventDefault();
                          setRemoveHoverColor(DEFAULT_REMOVE_HOVER_COLOR);
                        }}
                      >
                        <Remove color={removeHoverColor} />
                      </div>
                    </div>
                  </>
                ) : (
                  "Drop CSV file here or click to upload"
                )}
              </div>
            </>
          )}
        </CSVReader>
      </GreenlistUploadContainer>
      {updatingGreenlist ? (
        <LoadingRing />
      ) : (
        greenlistResults.length > 0 && (
          <div>
            <b>
              {greenlist.count.toLocaleString()} Address
              {greenlist.count != 1 && "es"}
            </b>
            <br />
            <br />
            <InfiniteScroll
              dataLength={greenlistResults.length}
              next={fetchMoreAddresses}
              hasMore={moreGreenlist}
              loader={<LoadingRing />}
              style={{ overflow: "visible" }}
            >
              <GreenlistGrid>
                {greenlistResults.map((addr, index) => (
                  <div key={index}>{addr.address}</div>
                ))}
              </GreenlistGrid>
            </InfiniteScroll>
          </div>
        )
      )}
    </EditorGrid>
  );
};
