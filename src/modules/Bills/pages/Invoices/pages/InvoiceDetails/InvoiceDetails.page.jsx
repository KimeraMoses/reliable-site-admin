
import './InvoiceDetails.styles.scss';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { getInvoiceById } from 'store';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export const InvoiceDetails = () => {
    const { t } = useTranslation('/Bills/ns');
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInvoiceById(id));
    }, []);    

    const { loading, invoice } = useSelector((state) => state?.invoices);
    return (
        <div className="users">
            <div className="bg-[#1E1E2D] rounded-lg">
                <div className="users invoice-details">
                    <div className="invoice-Details__left">
                        <div className="flex justify-between items-center">
                            <h4 className="text-white text-[24px]">Invoice #12580</h4>
                            <button class="bg-[#0BB783] rounded-[8px] px-[16px] py-[8px] text-[#fff] mb-0">{t('payNow')}</button>
                        </div>
                        <div className="mt-[40px]">
                            <h6 className="text-[#474761] text-[14px]">{t('issueDate')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">05 Feb 2022</p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('dueDate')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">05 Feb 2022 . <span className="text-[#F64E60] inline-block">Due Today</span></p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('issueFor')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Sample Product</p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('issueBy')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Paul Elliott</p>
                        </div>
                        <div className="mt-[40px]">
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#474761] text-[12px] uppercase">{t('description')}</h6>
                                <h6 className="text-[#474761] text-[12px] uppercase">{t('amount')}</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#F64E60] mr-[5px]"></span>Product Item Title</h6>
                                <h6 className="text-[#fff] text-[14px]">$100.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#0BB783] mr-[5px]"></span>Product Item Title</h6>
                                <h6 className="text-[#fff] text-[14px]">$100.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#3699FF] mr-[5px]"></span>Product Item Title</h6>
                                <h6 className="text-[#fff] text-[14px]">$100.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>{t('subTotal')}</h6>
                                <h6 className="text-[#fff] text-[14px]">$300.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>{t('vat')}</h6>
                                <h6 className="text-[#fff] text-[14px]">$0.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                            <div className="flex items-center justify-between">
                                <h6 className="text-[#fff] text-[14px]"><span className="w-[10px] h-[10px] inline-block rounded-[50%] border-2 border-[#323248] mr-[5px]"></span>{t('Total')}</h6>
                                <h6 className="text-[#fff] text-[14px]">$300.00</h6>
                            </div>
                            <div className="border-dashed border-t-[1px] h-[0px] border-[#323248] mt-[20px] mb-[20px]" ></div>
                        </div>
                    </div>
                    <div className="invoice-Details__right p-[40px] bg-[#1A1A27] border-dashed border-[1px] border-[#323248] rounded-[8px]">
                        <button className="bg-[#1C3238] rounded-[8px] px-[8px] py-[4px] text-[10px] text-[#0BB783] mb-0 uppercase">APPROVED</button>
                        <button className="bg-[#392F28] rounded-[8px] px-[8px] py-[4px] text-[10px] text-[#FFA800] ml-[15px] uppercase">PENDING PAYMENT</button>
                        <h4 className="text-[#474761] text-[16px] mt-[65px] uppercase">{t('paymentDetails')}</h4>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('payPal')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Paul.Elliott@Fakemail.com</p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('account')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Nl24IBAN34553477847370033</p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('paymentTerms')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">14 Days . <span className="text-[#F64E60] inline-block">Due Today</span></p>
                        </div>
                        <h4 className="text-[#474761] text-[16px] mt-[60px] uppercase">{t('overview')}</h4>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('productName')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Sample Product . <NavLink to={"#"} className="text-[#3699FF] inline-block">{t('viewProduct')}</NavLink></p>
                        </div>
                        <div className="mt-[20px]">
                            <h6 className="text-[#474761] text-[14px]">{t('completedBy')}</h6>
                            <p class="text-[#fff]  text-[14px] mt-[4px]">Paul Elliott</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}