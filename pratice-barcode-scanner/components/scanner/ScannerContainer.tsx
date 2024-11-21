"use client";
import { useCallback, useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";

enum ScannerMode {
  ONCE = "once",
  CONTINUE = "continue",
}

const ScannerMix = () => {
  const [selectedMode, setSelectedMode] = useState<ScannerMode>(
    ScannerMode.ONCE
  );
  const [selectedDevice, setSelectedDevice] = useState<string | undefined>();
  const [videoInputDevices, setVideoInputDevices] = useState<MediaDeviceInfo[]>(
    []
  );
  const [result, setResult] = useState<string>("");
  const [codeReader, setCodeReader] = useState<BrowserMultiFormatReader | null>(
    null
  );

  useEffect(() => {
    const initReader = async () => {
      try {
        const codeReader = new BrowserMultiFormatReader();
        setCodeReader(codeReader);
        const devices = await codeReader.listVideoInputDevices();
        console.log("Video input devices:", devices);
        setVideoInputDevices(devices);
        if (devices.length > 0) {
          setSelectedDevice(devices[0].deviceId);
        }
      } catch (error) {
        console.error("Error initializing scanner:", error);
      }
    };

    initReader();

    return () => {
      if (codeReader) {
        codeReader.reset();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStart = () => {
    if (!codeReader || !selectedDevice) return;

    // continue mode
    if (selectedMode === ScannerMode.CONTINUE) {
      codeReader.decodeFromVideoDevice(
        selectedDevice,
        "video",
        (result, error) => {
          if (result) {
            console.log("Result:", result);
            setResult(result.getText());
          }
          if (error) {
            console.log("Error:", error);
          }
        }
      );
      return;
    }

    // once mode
    const scanOnce = async () => {
      try {
        const result = await codeReader.decodeOnceFromVideoDevice(
          selectedDevice,
          "video"
        );
        codeReader.reset();
        setResult(result.getText());
      } catch (error) {
        console.log("Stoped scanning once:", error);
      }
    };
    scanOnce();
  };

  const handleReset = useCallback(() => {
    if (codeReader) {
      codeReader.reset();
      setResult("");
    }
  }, [codeReader]);

  const handleModeChange = useCallback(
    (mode: ScannerMode) => {
      setSelectedMode(mode);
      handleReset();
    },
    [handleReset]
  );

  return (
    <div id="scanner" className="flex flex-col space-y-4">
      <div id="scanner-controller" className="flex justify-between px-2">
        <div className="flex space-x-1">
          <Button onClick={handleStart}>Start</Button>
          <Select
            value={selectedMode}
            onValueChange={(val) => handleModeChange(val as ScannerMode)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select scanner mode" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(ScannerMode).map((mode) => (
                <SelectItem key={mode} value={mode}>
                  {mode}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleReset} variant="outline">
          Reset
        </Button>
      </div>
      <div id="scanner-video">
        <video
          id="video"
          className="w-[300px] h-[200px] border border-solid border-gray-600"
        />
      </div>
      <div id="scanner-device">
        <Select value={selectedDevice}>
          <SelectTrigger>
            <SelectValue placeholder="Select your camera device" />
          </SelectTrigger>
          <SelectContent>
            {videoInputDevices.map((device) => (
              <SelectItem
                key={device.deviceId}
                value={device.deviceId}
                onClick={() => setSelectedDevice(device.deviceId)}
              >
                {device.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div
        id="scanner-result"
        className="border border-solid border-gray-800 py-1 px-2 rounded-md"
      >
        <pre
          id="result"
          className="text-sm before:content-['Result:'] before:mr-1 before:text-gray-600"
        >
          {result}
        </pre>
      </div>
    </div>
  );
};

export default ScannerMix;
