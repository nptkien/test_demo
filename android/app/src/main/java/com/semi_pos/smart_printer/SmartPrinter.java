package com.semi_pos.smart_printer;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;
import androidx.appcompat.app.AlertDialog;
import android.os.Message;
import android.os.Handler;
import java.util.Arrays;
import android.os.Looper;

import sdk4.wangpos.libemvbinder.utils.ByteUtil;
import wangpos.sdk4.libbasebinder.Printer;

public class SmartPrinter extends ReactContextBaseJavaModule {

    private Printer mPrinter;
    private int command = 0;

    public SmartPrinter(ReactApplicationContext context) {
        super(context);
    }

    public enum SmartPrinterEnum {
        ERROR,
        SUCCESS,
        INIT,
        PRINTTING,
        FINISH,

    }

    @ReactMethod
    public void demoHandlePrintEvent(String deviceName) {
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());

        Log.i("DeviceInfoModule", "Đã lấy chiều rộng màn hình thành công");
        command = 0;
        new PrintThread().start();
    }

    @ReactMethod
    public String demo(String deviceName) {
        return "AAADSFDSAFASDFASFDS";
    }

    @Override
    public String getName() {
        return "Printer";
    }

    public SmartPrinterEnum initPrint() {
        return SmartPrinterEnum.INIT;
    }

    public SmartPrinterEnum startPrint() {
        int[] status = new int[1];
        // mPrinter = new Printer(getApplicationContext());
        // mPrinter.setPrintType(1);
        // mPrinter.printInit();
        status[0] = 0;
        return SmartPrinterEnum.PRINTTING;
    }

    public SmartPrinterEnum finishPrint() {
        return SmartPrinterEnum.FINISH;
    }

    public class PrintThread extends Thread {
        private Handler mHandler = new Handler() {
            @Override
            public void handleMessage(Message msg) {
                super.handleMessage(msg);
                String result_show = "";
                switch (msg.what) {
                    case 0:
                        if ((SmartPrinterEnum) msg.obj == SmartPrinterEnum.SUCCESS) {
                            result_show = "init printer success";
                        } else
                            result_show = "init printer error; result = " + msg.obj;
                        break;
                    case 1:
                        if ((SmartPrinterEnum) msg.obj == SmartPrinterEnum.SUCCESS) {
                            result_show = "printing...";
                        } else
                            result_show = " printer error; status = " + msg.obj;

                        break;
                    case 2:
                        if ((SmartPrinterEnum) msg.obj == SmartPrinterEnum.SUCCESS) {
                            result_show = "finish printer success";
                        } else
                            result_show = "finish printer error; result = " + msg.obj;
                        break;
                }
                Log.i("ERRORRRRRR", result_show);
                AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());
                builder.setTitle("mess:")
                        .setMessage(result_show)
                        .setPositiveButton("OK", null)
                        .create()
                        .show();
                // textShow.setText(result_show);
            }
        };

        @Override
        public void run() {
            SmartPrinterEnum result = SmartPrinterEnum.ERROR;
            Looper.prepare();
            Message msg = new Message();
            Log.e("===== run", "XXXX");
            switch (command) {
                case 0:
                    result = initPrint();
                    break;
                case 1:
                    result = startPrint();
                    break;
                case 2:
                    result = finishPrint();
                    break;
                // case 4:
                // result = testPrint();
                // break;
                // case 3:
                // try {
                // InputStream inputStream = getAssets().open("2345.jpg");
                // Bitmap bitmap = BitmapFactory.decodeStream(inputStream);
                // int height = bitmap.getHeight();
                // int width = bitmap.getWidth();
                // Log.d(TAG, "run: height = "+height+"; width = "+width);
                // PrintBean printBean = new PrintBean();
                // printBean.setHeight(800);
                // printBean.setWidth(360);
                // printBean.setOffset(0);
                // printBean.setmAlign(Printer.Align.LEFT);
                // printBean.setPaperSkip(80);
                // printBean.setBitmap(bitmap);
                // result = WiseasyPrint.printBitmap(getApplicationContext(), printBean);
                // bitmap.recycle();
                // } catch (IOException e) {
                // e.printStackTrace();
                // }
                // break;
            }
            msg.what = command;
            msg.obj = result;
            mHandler.sendMessage(msg);
        }
    }

}
